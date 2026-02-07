import { isRejectedWithValue } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger =
  ({ dispatch, getState }) =>
    next =>
      action => {
        // console.log("action", action);
        if (isRejectedWithValue(action)) {
          console.log('errorLogger.js:', action);

        }

        return next(action);
      };
