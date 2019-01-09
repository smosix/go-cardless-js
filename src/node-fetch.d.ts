declare module "node-fetch" {
  export default function fetch(
    url: string,
    opts: { method: string; headers: { [key: string]: string }; body: string }
  ): Promise<unknown>;
}
