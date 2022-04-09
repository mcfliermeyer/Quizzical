const glassColor = "rgba(132, 182, 190, 0.3)";

export const theme = {
  colors: {
    containerColor: "rgba(132, 182, 190, 0.6)",
    boxShadowOutsetColor: "rgb(146, 155, 163)",
    boxShadowInsetColor: "rgb(135, 144, 153)",
    clayButtonColor: `linear-gradient(145deg, #9d1bdd, #8417ba)`,
    fontColor: "rgb(228, 231, 234)",
  },
  boxShadows: {
    //  x,y,blur,spread
    buttonNotSelected: `20px 20px 60px #70139d,
             -20px -20px 60px #b61fff`,
    //selected: "inset 0 5px 8px 2px rgba(0, 0, 0, 0.5)",
    //notSelected: "0 5px 8px rgba(0, 0, 0, 0.5), inset 0 -2px 6px 2px rgba(0, 0, 0, 0.5)", //prettier-ignore
    //indentedGlass: `inset 4px 4px 2px 2px ${glassColor}, inset -4px -4px 2px 2px ${glassColor}`,
  },
};

//generator https://neumorphism.io/#e0e0e0