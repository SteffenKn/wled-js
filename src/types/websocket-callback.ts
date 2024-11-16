import {WLEDStateAndInfoResponse} from './wled';

export type WLEDLiveStreamCallback = (colors: string[]) => void | Promise<void>;
export type WLEDStateCallback = (data: WLEDStateAndInfoResponse) => void | Promise<void>;
