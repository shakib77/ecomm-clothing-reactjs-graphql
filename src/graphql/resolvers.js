import { gql } from 'apollo-boost';

import { addItemToCart, getCartItemCount } from './cart.utils';

export const typeDefs = gql `
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggoleCartHidden: Boolean!
        AddItemToCart(item: Item!) : [Item]!
    }
`;

const GET_CART_HIDDEN = gql `
    {
        cartHidden @clint
    }
`;

const GET_ITEM_COUNT = gql`
    {
        itemCount @clint
    }
`;

 const GET_CART_ITEMS = gql`
    {
        cartItems @clint
    }
 `;

export const resolvers = {
    Mutation: {
        toggoleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;
        },

        addItemToCart:(_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);
            
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { itemCount: getCartItemCount(newCartItems) }
            });

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            return newCartItems;
        }
    }
}