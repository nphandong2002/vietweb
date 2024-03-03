// return path format: /path....

import { Maybe } from 'src/types';

export const standardizePath = (path: string) => {
  const stdPath = path.replace(/\/{2,}/gi, '/');
  return stdPath.startsWith('/') ? stdPath : `/${stdPath}`;
};

export const concatPath = (...paths: (string | undefined)[]) =>
  standardizePath(paths.filter(Boolean).join('/'));

// return url format: origin/path (not end with /)

export const standardizeURL = (url: string) => {
  if (!url) return '';

  const stdURL = new URL('', url);
  const paths = stdURL.pathname.split('/').filter((path) => !!path);

  if (paths.length === 0) return stdURL.origin;

  return `${stdURL.origin}/${paths.join('/')}`;
};

export const concatBaseURLAndPath = (baseURL: Maybe<string>, path: Maybe<string>) => {
  const stdPath = path ? standardizePath(path) : '';

  if (!baseURL) return stdPath;

  const stdBaseURL = standardizeURL(baseURL);
  if (!stdPath) return stdBaseURL;

  return `${stdBaseURL}${stdPath}`;
};
