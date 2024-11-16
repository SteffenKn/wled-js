/**
 * @file WLEDJsonClient.ts
 * @description Client für die Kommunikation mit der WLED JSON API.
 */

import fetch from 'cross-fetch';

import {WLEDFullResponse, WLEDState, WLEDInfo, WLEDNodesResponse, WLEDStateAndInfoResponse, WLEDEffectsResponse, WLEDNetworkResponse, WLEDConfig} from '../types/index';

/**
 * WLEDJsonClient zur Kommunikation mit der WLED JSON API.
 */
export class ApiClient {
  private ip: string;

  constructor(ip: string) {
    this.ip = ip;
  }

  public async getData(): Promise<WLEDFullResponse> {
    const url = this.buildRoute('');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting data: [${response.statusText}] ${text}`);
    }

    const data: WLEDFullResponse = await response.json();
    return data;
  }

  public async getEffects(): Promise<string[]> {
    const url = this.buildRoute('eff');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting effects: [${response.statusText}] ${text}`);
    }

    const data: WLEDEffectsResponse = await response.json();
    return data;
  }

  public async getFxData(): Promise<string[]> {
    const url = this.buildRoute('fx');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting fx data: [${response.statusText}] ${text}`);
    }

    const data: string[] = await response.json();
    return data;
  }

  public async getNetworks(): Promise<WLEDNetworkResponse> {
    const url = this.buildRoute('net');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting networks: [${response.statusText}] ${text}`);
    }

    const data: WLEDNetworkResponse = await response.json();
    return data;
  }

  public async getPalettes(): Promise<string[]> {
    const url = this.buildRoute('pal');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting palettes: [${response.statusText}] ${text}`);
    }

    const data: string[] = await response.json();
    return data;
  }

  public async getConfig(): Promise<WLEDConfig> {
    const url = this.buildRoute('cfg');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting config: [${response.statusText}] ${text}`);
    }

    const data: WLEDConfig = await response.json();
    return data;
  }

  public async getInfo(): Promise<WLEDInfo> {
    const url = this.buildRoute('info');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting info: [${response.statusText}] ${text}`);
    }

    const info: WLEDInfo = await response.json();
    return info;
  }

  public async getNodes(): Promise<WLEDNodesResponse> {
    const url = this.buildRoute('nodes');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting nodes: [${response.statusText}] ${text}`);
    }

    const nodes: WLEDNodesResponse = await response.json();
    return nodes;
  }

  public async getStateAndInfo(): Promise<WLEDStateAndInfoResponse> {
    const url = this.buildRoute('state/info');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting state and info: [${response.statusText}] ${text}`);
    }

    const data: WLEDStateAndInfoResponse = await response.json();
    return data;
  }

  public async getState(): Promise<WLEDState> {
    const url = this.buildRoute('state');

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while getting state: [${response.statusText}] ${text}`);
    }

    const state: WLEDState = await response.json();
    return state;
  }

  public async updateState(state: Partial<WLEDState>) {
    const url = this.buildRoute('state');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });

    if (!response.ok) {
      const text = await response.text();

      throw new Error(`Error while updating state: [${response.statusText}] ${text}`);
    }
  }

  private buildRoute(route: string): string {
    return `http://${this.ip}/json/${route}`;
  }
}
