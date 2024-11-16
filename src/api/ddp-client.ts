import dgram from 'dgram';

import {DdpPacket, LedStrip} from '../types/index';

export class DdpClient {
  private socket: dgram.Socket;

  constructor(private readonly ip: string) {
    this.socket = dgram.createSocket('udp4');
  }

  public disconnect() {
    if (!this.socket) {
      return;
    }

    this.socket.close();

    delete this.socket;
  }

  public setLedStrip(ledStrip: LedStrip, disableValidation = false): Promise<void> {
    const ledStripToUse = disableValidation ? ledStrip : this.validateLedStrip(ledStrip);

    const bufferData = this.convertLedStripToBuffer(ledStripToUse);

    return this.sendData(bufferData, ledStripToUse.length);
  }

  public setLedStripByBuffer(buffer: Buffer, ledAmount: number): Promise<void> {
    return this.sendData(buffer, ledAmount);
  }

  public sendDdpPacket(packet: DdpPacket): Promise<void> {
    return this.sendPackage(packet);
  }

  private convertLedStripToBuffer(ledStrip: LedStrip): Buffer {
    const data = Buffer.concat(
      ledStrip.map((color) => {
        return Buffer.from([color.r, color.g, color.b]);
      }),
    );

    return data;
  }

  private sendData(data: Buffer, ledAmount: number): Promise<void> {
    const packet = this.createDdpPacket(data, ledAmount);
    const message = Buffer.concat([packet.header, packet.data]);

    this.connect();

    return new Promise<void>((resolve, reject) => {
      this.socket.send(message, 0, message.length, 4048, this.ip, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private sendPackage(packet: DdpPacket): Promise<void> {
    const message = Buffer.concat([packet.header, packet.data]);

    return new Promise<void>((resolve, reject) => {
      this.socket.send(message, 0, message.length, 4048, this.ip, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private connect() {
    if (this.socket) {
      return;
    }

    this.socket = dgram.createSocket('udp4');
  }

  private validateLedStrip(ledStrip: LedStrip): LedStrip {
    return ledStrip.map((color) => {
      return {
        r: Math.max(0, Math.min(255, color.r)),
        g: Math.max(0, Math.min(255, color.g)),
        b: Math.max(0, Math.min(255, color.b)),
      };
    });
  }

  private createDdpPacket(data: Buffer, ledAmount: number): DdpPacket {
    const header = Buffer.alloc(10);
    header[0] = 0x01;
    header[1] = 0x00;
    header[2] = 0x01;
    header[3] = 0x01;
    header.writeUInt32BE(0, 4);
    header.writeUInt16BE(ledAmount * 3, 8);

    return {header, data};
  }
}
