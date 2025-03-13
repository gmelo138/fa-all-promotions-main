const AudiFonts = `
  // Audi Type Normal
  @font-face {
    font-family: "Audi Type";
    font-style: normal;
    font-weight: normal;
    src: url("https://assets.audi.com/audi-fonts/1/AudiTypeVF.woff2") format("woff2-variations"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-Normal.woff2") format("woff2"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-Normal.woff") format("woff"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-Normal.ttf") format("truetype");
  }
  // Audi Type Bold
  @font-face {
    font-family: "Audi Type";
    font-style: normal;
    font-weight: 700;
    src: url("https://assets.audi.com/audi-fonts/1/AudiTypeVF.woff2") format("woff2-variations"),
          url("https://assets.audi.com/audi-fonts/1/AudiType.woff2") format("woff2"),
          url("https://assets.audi.com/audi-fonts/1/AudiType.woff") format("woff"),
          url("https://assets.audi.com/audi-fonts/1/AudiType.ttf") format("truetype");
  }
  
  // Audi Type Italic
  @font-face {
    font-family: "Audi Type";
    font-style: italic;
    font-weight: normal;
    src: url("https://assets.audi.com/audi-fonts/1/AudiType-Italic.woff2") format("woff2"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-Italic.woff") format("woff"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-Italic.ttf") format("truetype");
  }
  
  // Audi Type Bold Italic
  @font-face {
    font-family: "Audi Type";
    font-style: italic;
    font-weight: 700;
    src: url("https://assets.audi.com/audi-fonts/1/AudiType-BoldItalic.woff2") format("woff2"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-BoldItalic.woff") format("woff"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-BoldItalic.ttf") format("truetype");
  }
  
  // Audi Type Extended Normal
  @font-face {
    font-family: "Audi Type Extended";
    font-stretch: 130%;
    font-style: normal;
    font-weight: normal;
    src: url("https://assets.audi.com/audi-fonts/1/AudiTypeVF.woff2") format("woff2-variations"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedNormal.woff2") format("woff2"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedNormal.woff") format("woff"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedNormal.ttf") format("truetype");
  }
  
  // Audi Type Extended Bold
  @font-face {
    font-family: "Audi Type Extended";
    font-stretch: 130%;
    font-style: normal;
    font-weight: 700;
    src: url("https://assets.audi.com/audi-fonts/1/AudiTypeVF.woff2") format("woff2-variations"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedBold.woff2") format("woff2"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedBold.woff") format("woff"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedBold.ttf") format("truetype");
  }
  
  // Audi Type Extended Italic
  @font-face {
    font-family: "Audi Type Extended";
    font-stretch: 130%;
    font-style: italic;
    font-weight: normal;
    src: url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedItalic.woff2") format("woff2"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedItalic.woff") format("woff"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedItalic.ttf") format("truetype");
  }
  
  // Audi Type Extended Bold Italic
  @font-face {
    font-family: "Audi Type Extended";
    font-stretch: 130%;
    font-style: italic;
    font-weight: 700;
    src: url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedBoldItalic.woff2") format("woff2"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedBoldItalic.woff") format("woff"),
          url("https://assets.audi.com/audi-fonts/1/AudiType-ExtendedBoldItalic.ttf") format("truetype");
  }
  // Audi Type Wide Normal
  @font-face {
    font-family: "Audi Type Wide";
    font-stretch: 105%;
    font-style: normal;
    font-weight: normal;
    src: url("https://assets.audi.com/audi-fonts/1/AudiTypeVF.woff2") format("woff2-variations"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-WideNormal.woff2") format("woff2"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-WideNormal.woff") format("woff"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-WideNormal.ttf") format("truetype");
  }
  
  // Audi Type Wide Bold
  @font-face {
    font-family: "Audi Type Wide";
    font-stretch: 105%;
    font-style: normal;
    font-weight: 700;
    src: url("https://assets.audi.com/audi-fonts/1/AudiTypeVF.woff2") format("woff2-variations"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-WideBold.woff2") format("woff2"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-WideBold.woff") format("woff");
  }
  
  // Audi Type Wide Light
  @font-face {
    font-family: "Audi Type Wide";
    font-stretch: 105%;
    font-style: normal;
    font-weight: normal;
    src: url("https://assets.audi.com/audi-fonts/1/AudiType-WideLight.woff2") format("woff2"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-WideLight.woff") format("woff"),
        url("https://assets.audi.com/audi-fonts/1/AudiType-WideLight.ttf") format("truetype");
  }
`;

export default AudiFonts;
