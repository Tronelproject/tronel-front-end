import { server } from 'Root/config';

export default async (url, options) => {
  try {
    const res = await global.fetch(`${server}${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
    });

    const json = await res.json();
    if (res.status >= 400 && json.error) {
      return null;
    }

    return {
      res,
      data: json,
    };
  } catch (e) {
    return null;
  }
};
