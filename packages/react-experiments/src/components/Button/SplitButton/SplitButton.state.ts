import * as React from 'react';
import { ISplitButtonComponent, ISplitButtonViewProps } from './SplitButton.types';
import { KeyCodes } from '../../../Utilities';

export const useSplitButtonState: ISplitButtonComponent['state'] = props => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const { disabled, onMenuDismiss, onSecondaryActionClick } = props;

  const _onMenuDismiss = React.useCallback(() => {
    onMenuDismiss && onMenuDismiss();
    setExpanded(false);
  }, [onMenuDismiss]);

  const _onSecondaryActionClick = React.useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
      if (!disabled) {
        if (onSecondaryActionClick) {
          onSecondaryActionClick(ev);

          if (ev.defaultPrevented) {
            return;
          }
        }
        setExpanded(!expanded);
      }
    },
    [disabled, expanded, onSecondaryActionClick],
  );

  const _onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
      if (!disabled && (ev.altKey || ev.metaKey) && ev.keyCode === KeyCodes.down) {
        setExpanded(!expanded);
      }
    },
    [disabled, expanded],
  );

  const viewProps: ISplitButtonViewProps = {
    ...props,
    expanded,
    onKeyDown: _onKeyDown,
    onMenuDismiss: _onMenuDismiss,
    onSecondaryActionClick: _onSecondaryActionClick,
  };

  return viewProps;
};
