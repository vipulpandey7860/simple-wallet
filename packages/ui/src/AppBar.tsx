import { Button } from "./Button";

interface AppBarProps {
  user?: {
    name: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const AppBar = ({ user, onSignin, onSignout }: AppBarProps) => {
  return (
    <>
      <nav className="flex items-center justify-between border-b-2 px-6 py-4">
        <div className="logo">PaisaBank</div>
        <div className="auth">
          <Button onClick={user?.name ? onSignout : onSignin}>
            {user?.name ? "Logout" : "Login"}
          </Button>
        </div>
      </nav>
    </>
  );
};
