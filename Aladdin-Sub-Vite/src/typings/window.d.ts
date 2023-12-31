declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
  interface Window {
    $wujie: {
      bus: {
        $on: any;
        $emit: any;
        $off: any;
      };
      props: {
        primary: string;
        router: any;
      };
    };
    __POWERED_BY_WUJIE__: boolean;
    __WUJIE_MOUNT: any;
    __WUJIE_UNMOUNT: any;
    __WUJIE: any;
  }
}

export {};
