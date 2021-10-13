import type { Emitter, EventsMap } from 'nanoevents';
import type { Ref } from 'vue';

export type Frame = Ref<InstanceType<typeof HTMLIFrameElement>|undefined>;
export type Type = string;
export type Mode = 'host'|'client';

export type AsyncHandler<P = any> = (payload: P) => Promise<unknown>;

export interface Context<Events extends EventsMap> {
    mode: Mode;
    post: (type: Type, message?: any) => void;
    send: <R = unknown>(type: Type, message?: any) => Promise<R>;
    handle: <P = unknown>(type: Type, callback: AsyncHandler<P>) => () => void;
    destroy: () => void;
    iframe?: Frame;
    events: Emitter<Events>;
    remote?: string;
    logDebug: (type: 'debug'|'error', ...args: any[]) => void;
}

export interface Promises {
    [instance: string]: {
        [id: string]: {
            resolve: (value: any) => void;
            reject: (e: Error) => void;
            timeout: number;
        };
    };
}

export interface PostObject {
    id: string;
    type: Type;
    payload: any;
}

export interface Options {
    id: string;
    timeout?: number;
    iframe?: Frame;
    remote?: string;
    debug?: boolean;
    runtimeDebug?: boolean;
}
