import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {
  //Use ref hace referencia a un item en pantalla sin embargo en este caso se utiliza para prevenir un memory lake en el useEffect es decir se una como un cleaner
  const isMounted = useRef(true);

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });

    const requestApi = async () => {
      const sendingRequest = await fetch(url);
      const response = await sendingRequest.json();
      //Se evalual si el elemento se cargo del todo
      if(isMounted.current){
        setState({
          loading: false,
          error: null,
          data: response,
        });
      }else{
        console.log('SetState did not called');
      }
    };

    requestApi();
  }, [url]);

  return state;
};
