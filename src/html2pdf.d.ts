declare module 'html2pdf.js' {
    function html2pdf(): {
      from: (element: HTMLElement) => this;
      set: (options: object) => this;
      save: (filename?: string) => void;
    };
  
    export default html2pdf;
  }