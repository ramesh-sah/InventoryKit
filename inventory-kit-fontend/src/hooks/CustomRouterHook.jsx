import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


export default function CustomRouterHook(initialPath) {
    const navigate = useNavigate();
    const location = useLocation();

    const [pathname, setPathname] = React.useState(initialPath || location.pathname);

    React.useEffect(() => {
        setPathname(location.pathname);
    }, [location.pathname]);

    return {
        pathname,
        searchParams: new URLSearchParams(location.search),
        navigate: (path) => {
            setPathname(path);
            navigate(path);
        },
    };
}

