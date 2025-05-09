export function getSeasonalColors() {
    console.log("coloreees")
    const now = new Date()
    const month = now.getMonth()+1
    if (month >= 3 && month < 6) {
      return {
        mcbx: "bg-springmain",
        mctx: "text-springmain",
        scbx: "bg-springsec",
        sctx: "text-springsec",
      };
    } else if (month >= 6 && month < 9) {
      return {
        mcbx: "bg-summermain",
        mctx: "text-summermain",
        scbx: "bg-summersec",
        sctx: "text-summersec",
      };
    } else if (month >= 9 && month < 12) {
      return {
        mcbx: "bg-fallmain",
        mctx: "text-fallmain",
        scbx: "bg-fallsec",
        sctx: "text-fallsec",
      };
    } else {
      console.log("Es invierno")
      return {
        mcbx: "bg-wintermain",
        mctx: "text-wintermain",
        scbx: "bg-wintersec",
        sctx: "text-wintersec",
      };
    }
  }