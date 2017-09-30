export = driveByPath;

declare function driveByPath (filepath: string, cwd?: string): Promise<{
  mountpointPath: string,
  drive: driveByPath.Drive,
}>;

declare namespace driveByPath {
  type Drive = {
    device: string,
    displayName: string,
    description: string,
    size: number,
    mountpoints: {path: string}[],
    raw: string,
    protected: boolean,
    system: boolean,
  }
}
