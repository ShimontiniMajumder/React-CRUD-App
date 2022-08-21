import {useState, useEffect} from "react";

 const useWindowSize = () => { // Custom Hooks declaration
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined
        });

            useEffect(() => {

                const handleResize = () => {
                    setWindowSize({
                        width : window.innerWidth,
                        height: window.innerHeight
                    });
                }
                handleResize();

                window.addEventListener("resize" , handleResize);
                // prevents memory leaks, a cleanup func is called , 
                //when dependencies change for useEffect. to remove the eventlistener
                //here dependencies is only on load
              
                return () => window.removeEventListener("resize" , handleResize);
            }, []);

    return windowSize;
}

export default useWindowSize;