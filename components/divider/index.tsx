import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
  asHeading?: boolean;
}

const Divider: React.FC<DividerProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        type = 'horizontal',
        orientation = 'center',
        className,
        children,
        dashed,
        asHeading,
        ...restProps
      } = props;
      const prefixCls = getPrefixCls('divider', customizePrefixCls);
      const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation;
      const hasChildren = !!children;
      const classString = classNames(className, prefixCls, `${prefixCls}-${type}`, {
        [`${prefixCls}-with-text`]: hasChildren,
        [`${prefixCls}-with-text${orientationPrefix}`]: hasChildren,
        [`${prefixCls}-dashed`]: !!dashed,
        [`${prefixCls}-heading`]: asHeading,
      });
      return (
        <div className={classString} {...restProps} role="separator">
          {children && <span className={`${prefixCls}-inner-text`}>{children}</span>}
        </div>
      );
    }}
  </ConfigConsumer>
);

Divider.defaultProps = {
  asHeading: true,
};

export default Divider;
