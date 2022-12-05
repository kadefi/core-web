import { getPageLayout } from "../../layouts/Layout";

const Donate = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start overflow-auto px-8 py-4 text-slate-300">
      <div className="w-full max-w-2xl text-3xl font-bold text-pink-600">
        A Message From Kadefi.Money Founders
      </div>
      <div className="mt-4 flex w-full max-w-2xl flex-col items-start gap-4 text-sm">
        <div>
          We want to take a quick moment to say thank you for your undying love
          and support of our little app. Without your unwavering enthusiasm and
          constant stream of hilarious memes and gifs, we might have lost our
          way. Thanks to your encouragement, we&apos;re able to keep pushing
          forward and making Kadefi.Money the best it can be.
        </div>
        <div>
          Here is what we have accomplished so far and counting (the numbers
          would be updated LIVE as we continue to add new integrations to our
          platform)
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-800">
            20
          </div>
          <div>Tokens Integrated</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-800">
            20
          </div>
          <div>NFT Collections Integrated</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-800">
            20
          </div>
          <div>Tokens integrated</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-800">
            32
          </div>
          <div>Trading Pairs with Real-time Price Chart</div>
        </div>
        <div>
          We know you love using our platform, and we want to continue providing
          the best possible experience. But let&apos;s be real, we can&apos;t do
          it without your help. If you are feeling generous (or just really want
          those new features and integrations), we&apos;d really appreciate a
          donation.
        </div>

        <div>
          The money would be put into good use to keep our server running and
          make our platform even better. And as a token of our appreciation,
          we&apos;ll even throw in a virtual hug (just don&apos;t expect a real
          one - we&apos;re not that kind of platform ;) You can find our wallet
          address here:
        </div>
        <div className="w-full truncate rounded-md bg-pink-800 py-2 px-4">
          k:9d46e06675aaaea9803c8baadf0d26b9f933ed85f58f086d2bb700266bad6a65
        </div>
        <div>
          From the bottom of our hearts, we truly appreciate your support and we
          look forward to continuing serving you and the Kadena community in the
          future.
        </div>
        <div>Sincerely,</div>
        <div>Kadefi.Money Founders</div>
      </div>
    </div>
  );
};

Donate.getLayout = getPageLayout;

export default Donate;
