import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

const TOGGLE_CART_HIDDEN = gql `
    mutation ToggleCartHidden {
        toggoleCartHidden @client
    }
`;

const CartIconContainer = () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            toggoleCartHidden => <CartIcon toggleCartHidden={toggoleCartHidden} />
        }
    </Mutation>
);

export default CartIconContainer;