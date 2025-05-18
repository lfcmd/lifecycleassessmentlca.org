
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface AuthButtonsProps {
  isMobile?: boolean;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false }) => {
  const { t } = useLanguage();
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check current auth status
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    checkUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: t('logoutSuccess'),
        description: t('logoutSuccess'),
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: t('loginFailed'),
        description: "退出登录时出错，请重试",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return null;
  }

  if (user) {
    // User is signed in
    if (isMobile) {
      return (
        <>
          <Link to="/dashboard" className="block py-2 text-foreground hover:text-eco-green transition-colors">
            {t('dashboard')}
          </Link>
          <button 
            onClick={handleSignOut}
            className="block py-2 text-foreground hover:text-eco-green transition-colors"
          >
            {t('logout')}
          </button>
        </>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Button variant="outline" asChild>
          <Link to="/dashboard">
            <UserCircle className="mr-2 h-4 w-4" />
            {t('dashboard')}
          </Link>
        </Button>
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {t('logout')}
        </Button>
      </div>
    );
  }

  // User is not signed in
  if (isMobile) {
    return (
      <>
        <Link to="/login" className="block py-2 text-foreground hover:text-eco-green transition-colors">
          {t('login')}
        </Link>
        <Link to="/register" className="block py-2 text-foreground hover:text-eco-green transition-colors">
          {t('register')}
        </Link>
      </>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" asChild>
        <Link to="/login">{t('login')}</Link>
      </Button>
      <Button className="bg-eco-green hover:bg-eco-green/90 text-white" asChild>
        <Link to="/register">{t('register')}</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
