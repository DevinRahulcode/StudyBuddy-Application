/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/Esad`; params?: Router.UnknownInputParams; } | { pathname: `/FlashcardGeneratorScreen`; params?: Router.UnknownInputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/Learn`; params?: Router.UnknownInputParams; } | { pathname: `/Summary`; params?: Router.UnknownInputParams; } | { pathname: `/Task`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/Esad`; params?: Router.UnknownOutputParams; } | { pathname: `/FlashcardGeneratorScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/Learn`; params?: Router.UnknownOutputParams; } | { pathname: `/Summary`; params?: Router.UnknownOutputParams; } | { pathname: `/Task`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/Esad${`?${string}` | `#${string}` | ''}` | `/FlashcardGeneratorScreen${`?${string}` | `#${string}` | ''}` | `/HomeScreen${`?${string}` | `#${string}` | ''}` | `/Learn${`?${string}` | `#${string}` | ''}` | `/Summary${`?${string}` | `#${string}` | ''}` | `/Task${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/Esad`; params?: Router.UnknownInputParams; } | { pathname: `/FlashcardGeneratorScreen`; params?: Router.UnknownInputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/Learn`; params?: Router.UnknownInputParams; } | { pathname: `/Summary`; params?: Router.UnknownInputParams; } | { pathname: `/Task`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
