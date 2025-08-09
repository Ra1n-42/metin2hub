import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface SimpleTooltipProps {
    content: string;
    children: React.ReactElement;
    side?: 'top' | 'bottom' | 'left' | 'right';
}

export function SimpleTooltip({ content, children, side = 'bottom' }: SimpleTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLElement>(null);

    const updatePosition = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();

            let x = rect.left + rect.width / 2;
            let y = rect.top;

            switch (side) {
                case 'top':
                    y = rect.top - 8;
                    break;
                case 'bottom':
                    y = rect.bottom + 8;
                    break;
                case 'left':
                    x = rect.left - 8;
                    y = rect.top + rect.height / 2;
                    break;
                case 'right':
                    x = rect.right + 8;
                    y = rect.top + rect.height / 2;
                    break;
            }

            setPosition({ x, y });
        }
    };

    useEffect(() => {
        if (isVisible) {
            updatePosition();
        }
    }, [isVisible]);

    const getTooltipClasses = () => {
        const baseClasses = "fixed z-[9999] px-3 py-1.5 text-sm bg-popover text-popover-foreground border border-border rounded-md shadow-lg whitespace-nowrap pointer-events-none";

        switch (side) {
            case 'top':
                return `${baseClasses} transform -translate-x-1/2 -translate-y-full`;
            case 'bottom':
                return `${baseClasses} transform -translate-x-1/2`;
            case 'left':
                return `${baseClasses} transform -translate-x-full -translate-y-1/2`;
            case 'right':
                return `${baseClasses} transform -translate-y-1/2`;
            default:
                return `${baseClasses} transform -translate-x-1/2`;
        }
    };

    const getArrowClasses = () => {
        const baseClasses = "absolute w-0 h-0";

        switch (side) {
            case 'top':
                return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-popover`;
            case 'bottom':
                return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-popover`;
            case 'left':
                return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-popover`;
            case 'right':
                return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-popover`;
            default:
                return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-popover`;
        }
    };

    const clonedChild = React.cloneElement(children, {
        ref: triggerRef,
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
    } as any);

    const tooltip = isVisible ? (
        <div
            className={getTooltipClasses()}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            {content}
            <div className={getArrowClasses()}></div>
        </div>
    ) : null;

    return (
        <>
            {clonedChild}
            {tooltip && createPortal(tooltip, document.body)}
        </>
    );
}