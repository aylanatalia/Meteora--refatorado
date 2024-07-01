import { useEffect, useMemo, useReducer, useState } from 'react';
import { createContext } from "react";
import { carrinhoReducer } from '../reducers/CarrinhiReducer';

//cria um contexto retornando alguns componentes
export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoIncial = [];

//provider armasena o contexto
export const CarrinhoProvider = ({ children }) => {
    const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoIncial)
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    const { totalTemporaria, quantidadeTemporaria } = useMemo(() => {
        return carrinho.reduce(
            (acumulador, produto) => ({
                quantidadeTemporaria: acumulador.quantidadeTemporaria + produto.quantidade,
                totalTemporaria: acumulador.totalTemporaria + produto.preco * produto.quantidade,
            }),
            {
                quantidadeTemporaria: 0,
                totalTemporaria: 0,
            }
        );
    }, [carrinho])

    useEffect(() => {
        setQuantidade(quantidadeTemporaria)
        setValorTotal(totalTemporaria)
    })

    return (
        //value vai receber os estados
        <CarrinhoContext.Provider value={{
            carrinho,
            dispatch,
            quantidade,
            valorTotal,
        }}
        >
            {children}
        </CarrinhoContext.Provider>
    )
}