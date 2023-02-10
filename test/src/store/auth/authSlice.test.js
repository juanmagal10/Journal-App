import { authSlice, login, logout, checkingCredentials } from "../../../../src/store/auth/authSlice"
import { demoUser, initialState, notAuthenticatedState, authenticatedState } from "../../fixtures/authFixtures"

describe('Pruebas en el authSlice', () => {
  test('should ', () => {
      const state=authSlice.reducer(initialState, {});
      expect(authSlice.name).toBe('auth');


      expect(state).toEqual(initialState);
  })
    
    test('debe de realizar la autenticacion', () => {

        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
                status: 'authenticated',
                uid: 'ABC123',
                email: 'demo@google.com',
                displayName: 'Demo User',
                photoURL: 'https://foto.jpg',
                errorMessage: null,
        })
    })

    test('debe de realizar el logout', () => {
        const state = authSlice.reducer(authenticatedState, logout());
                expect(state).toEqual({
                status:'not-authenticated',
                uid: null, 
                email: null, 
                displayName: null, 
                photoURL: null,
                errorMessage: undefined,
        })
    })

    test('debe de realizar el  y mostrar un mensaje de error', () => {
        const errorMessage = 'Credenciales incorrectas'

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    });
    
    test('debe de cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking')
    });
    
    
  
})
