import { getProviders, signIn } from "next-auth/react";
import { FC } from "react";

interface IProvider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface IProps {
  providers: IProvider[];
}

const Login: FC<IProps> = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img src="https://links.papareact.com/9xl" alt="" className="w-52 mb-5" />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Login;
