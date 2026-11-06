import { createContext, useContext } from 'react';

/** Lets the site know when the intro has finished covering it, so page animations start at the reveal. */
export const READY = { ready: true };
export const NOT_READY = { ready: false };
export const IntroContext = createContext(READY);
export const useIntroReady = () => useContext(IntroContext).ready;
