export default function MakerWidget() {
  if (typeof document !== "undefined") {
    (function (d, h, m) {
      let js,
        fjs = d.getElementsByTagName(h)[0];
      if (d.getElementById(m)) {
        return;
      }
      js = d.createElement(h);
      js.id = m;
      js.onload = function () {
        (window as any).makerWidgetComInit({
          position: "left",
          widget: "nbywzzf1aadt6rfr-6ganb1qswycict7n-e97tjk43iuytcvyc"
        });
      };
      js.src = "https://makerwidget.com/js/embed.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "dhm");
  }

  return <script />;
}
