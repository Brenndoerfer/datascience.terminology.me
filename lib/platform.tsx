import platform from 'platform-detect'

export function platformShortcut() {
    if (platform.windows) {
        return "(CTRL+K)"
    }
    if (platform.macos) {
        return "(⌘+K)"
    }
    return ""
}

export function handleEsc(ref) {
    const handleEsc = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
            ref.current.blur()
        }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
        window.removeEventListener('keydown', handleEsc);
    };
}