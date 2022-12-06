import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "ui";
import Breakpoint from "ui/constants/Breakpoint.constant";
import { useMinWidth } from "ui/hooks";

import { widget } from "../../../public/static/charting_library";
import { CHART_STATE_LS_KEY } from "../../constants";
import { LocalStorage } from "../../utils";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);

  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const TVChartContainer = (props) => {
  const { symbol } = props;
  const [isLoading, setIsLoading] = useState(true);

  const tvWidgetRef = useRef(null);

  const ref = useRef();

  const smAndAbove = useMinWidth(Breakpoint.sm);

  const loadingIndicator = (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-slate-900">
      <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
        <LoadingSpinner />
        Loading chart data
      </div>
    </div>
  );

  useEffect(() => {
    if (!symbol) {
      return;
    }

    const enabledFeatures = [];

    if (!smAndAbove) {
      enabledFeatures.push("hide_left_toolbar_by_default");
    }

    const widgetOptions = {
      theme: "Dark",
      symbol: symbol,
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        process.env.NEXT_PUBLIC_API_URL
      ),
      interval: "1h",
      container: ref.current,
      library_path: "/static/charting_library/",
      locale: getLanguageFromURL() || "en",
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
        "symbol_search_hot_key",
        "header_compare",
        "timeframes_toolbar",
        "header_undo_redo",
        "header_saveload",
        "control_bar",
        "popup_hints",
      ],
      enabled_features: enabledFeatures,
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
      studies_overrides: {},
      custom_css_url: "/css/CustomTradingViewStyle.css",
      overrides: {
        "paneProperties.background": "#0f172a",
        "paneProperties.backgroundType": "solid",
      },
    };

    const tvWidget = new widget(widgetOptions);

    tvWidgetRef.current = tvWidget;

    tvWidget.onChartReady(() => {
      setIsLoading(false);

      tvWidget.subscribe("drawing_event", function () {
        tvWidget.save(function (state) {
          LocalStorage.set(CHART_STATE_LS_KEY, { [symbol]: state });
        });
      });

      const state = LocalStorage.get(CHART_STATE_LS_KEY);

      // restore the chart to its saved state
      if (state && symbol in state) {
        tvWidget.load(state[symbol]);
      }
    });

    return () => {
      if (tvWidgetRef.current !== null) {
        tvWidgetRef.current.remove();
        tvWidgetRef.current = null;
      }
    };
  }, [smAndAbove, symbol]);

  if (!symbol) {
    return loadingIndicator;
  }

  return (
    <>
      {isLoading && loadingIndicator}
      <div ref={ref} className="h-full" />
    </>
  );
};

export default TVChartContainer;
