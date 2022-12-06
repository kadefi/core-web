export const copyToClipboard = (text: string) => {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.style.display = "hidden";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};
