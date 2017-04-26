export class RedirectModel {
  id?: string;
  targetProtocol: string;
  targetHost: string;
  hostSources: Array<string>;
}
