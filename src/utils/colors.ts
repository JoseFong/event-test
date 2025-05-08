export function getSeasonalColors() {
    console.log("coloreees")
    const now = new Date()
    const month = now.getMonth()+1
    if (month >= 3 && month < 6) {
      return {
        mcb: "bg-springmain",
        mct: "text-springmain",
        scb: "bg-springsec",
        sct: "text-springsec",
      };
    } else if (month >= 6 && month < 9) {
      return {
        mcb: "bg-summermain",
        mct: "text-summermain",
        scb: "bg-summersec",
        sct: "text-summersec",
      };
    } else if (month >= 9 && month < 12) {
      return {
        mcb: "bg-fallmain",
        mct: "text-fallmain",
        scb: "bg-fallsec",
        sct: "text-fallsec",
      };
    } else {
      console.log("Es invierno")
      return {
        mcb: "bg-wintermain",
        mct: "text-wintermain",
        scb: "bg-wintersec",
        sct: "text-wintersec",
      };
    }
  }