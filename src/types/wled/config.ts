export type WLEDConfig = {
  /** Firmware revision information */
  rev: [number, number];
  /** Version ID */
  vid: number;
  /** Device identity */
  id: {
    /** mDNS name of the device */
    mdns: string;
    /** Display name of the device */
    name: string;
    /** Inverted display name */
    inv: string;
  };
  /** Network settings */
  nw: {
    ins: {
      /** WiFi SSID */
      ssid: string;
      /** WiFi password length */
      pskl: number;
      /** IP address */
      ip: [number, number, number, number];
      /** Gateway address */
      gw: [number, number, number, number];
      /** Subnet mask */
      sn: [number, number, number, number];
    }[];
  };
  /** Access point settings */
  ap: {
    /** AP SSID */
    ssid: string;
    /** AP password length */
    pskl: number;
    /** WiFi channel */
    chan: number;
    /** Hidden network */
    hide: number;
    /** Behavior on connection loss */
    behav: number;
    /** AP IP address */
    ip: [number, number, number, number];
  };
  /** WiFi settings */
  wifi: {
    /** WiFi sleep mode enabled */
    sleep: boolean;
    /** Physical WiFi mode */
    phy: boolean;
  };
  /** Hardware configuration */
  hw: {
    /** LED settings */
    led: {
      /** Total number of LEDs */
      total: number;
      /** Maximum power in mW */
      maxpwr: number;
      /** LED master brightness */
      ledma: number;
      /** Color temperature control enabled */
      cct: boolean;
      /** Color correction */
      cr: boolean;
      /** Color balance */
      cb: number;
      /** Frames per second */
      fps: number;
      /** RGBW mode setting */
      rgbwm: number;
      /** LED data enabled */
      ld: boolean;
      /** LED instances */
      ins: {
        start: number;
        len: number;
        pin: number[];
        order: number;
        rev: boolean;
        skip: number;
        type: number;
        ref: boolean;
        rgbwm: number;
        freq: number;
      }[];
    };
    /** Communication settings */
    com: any[];
    /** Button configuration */
    btn: {
      /** Maximum number of buttons */
      max: number;
      /** Pull-up resistor enabled */
      pull: boolean;
      /** Button instances */
      ins: {
        type: number;
        pin: number[];
        macros: [number, number, number];
      }[];
      /** Button hold time in milliseconds */
      tt: number;
      /** MQTT button press enabled */
      mqtt: boolean;
    };
    /** Infrared receiver settings */
    ir: {
      pin: number;
      type: number;
      sel: boolean;
    };
    /** Relay settings */
    relay: {
      pin: number;
      rev: boolean;
    };
    /** Baud rate for serial communication */
    baud: number;
    /** Interface pins */
    if: {
      'i2c-pin': [number, number];
      'spi-pin': [number, number, number];
    };
  };
  /** Light settings */
  light: {
    /** Brightness scaling */
    'scale-bri': number;
    /** Palette mode */
    'pal-mode': number;
    /** Automatic segment mode */
    aseg: boolean;
    /** Gamma correction */
    gc: {
      bri: number;
      col: number;
      val: number;
    };
    /** Transition settings */
    tr: {
      mode: boolean;
      fx: boolean;
      dur: number;
      pal: number;
      rpc: number;
    };
    /** Nightlight settings */
    nl: {
      mode: number;
      dur: number;
      tbri: number;
      macro: number;
    };
  };
  /** Default settings */
  def: {
    ps: number;
    on: boolean;
    bri: number;
  };
  /** Interface settings */
  if: {
    sync: {
      port0: number;
      port1: number;
      recv: {
        bri: boolean;
        col: boolean;
        fx: boolean;
        grp: number;
        seg: boolean;
        sb: boolean;
      };
      send: {
        dir: boolean;
        btn: boolean;
        va: boolean;
        hue: boolean;
        macro: boolean;
        grp: number;
        ret: number;
      };
    };
    nodes: {
      list: boolean;
      bcast: boolean;
    };
    live: {
      en: boolean;
      mso: boolean;
      port: number;
      mc: boolean;
      dmx: {
        uni: number;
        seqskip: boolean;
        e131prio: number;
        addr: number;
        dss: number;
        mode: number;
      };
      timeout: number;
      maxbri: boolean;
      'no-gc': boolean;
      offset: number;
    };
    va: {
      alexa: boolean;
      macros: [number, number];
      p: number;
    };
    mqtt: {
      en: boolean;
      broker: string;
      port: number;
      user: string;
      pskl: number;
      cid: string;
      rtn: boolean;
      topics: {
        device: string;
        group: string;
      };
    };
    hue: {
      en: boolean;
      id: number;
      iv: number;
      recv: {
        on: boolean;
        bri: boolean;
        col: boolean;
      };
      ip: [number, number, number, number];
    };
    ntp: {
      en: boolean;
      host: string;
      tz: number;
      offset: number;
      ampm: boolean;
      ln: number;
      lt: number;
    };
  };
  /** Remote settings */
  remote: {
    remote_enabled: boolean;
    linked_remote: string;
  };
  /** Overlay settings */
  ol: {
    clock: number;
    cntdwn: boolean;
    min: number;
    max: number;
    o12pix: number;
    o5m: boolean;
    osec: boolean;
  };
  /** Timer settings */
  timers: {
    cntdwn: {
      goal: [number, number, number, number, number, number];
      macro: number;
    };
    ins: {
      en: number;
      hour: number;
      min: number;
      macro: number;
      dow: number;
    }[];
  };
  /** Over-the-air (OTA) settings */
  ota: {
    lock: boolean;
    'lock-wifi': boolean;
    pskl: number;
    aota: boolean;
  };
  /** User-modifiable settings */
  um: any;
};
