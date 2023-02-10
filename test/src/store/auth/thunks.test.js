import { checkingCredentials, login, logout } from "../../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../../../src/store/auth/thunks";
import { loginWithEmailPassword, signInWithGoogle } from "../../../../src/firebase/provider";
import {demoUser} from '../../fixtures/authFixtures'


jest.mock("../../../../src/firebase/provider");

describe('Pruebas en los authThunks', () => {

  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('Debe invocar el checking credentials', async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn debe de llamar el chekingCredentials y login  -exito', async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  })

  test('startGoogleSignIn debe de llamar el chekingCredentials y logout  -error', async () => {
    const loginData = { ok: false, errorMessage: 'Un Error en google' };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  })

  
});
