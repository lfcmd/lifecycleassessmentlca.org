
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, FileText, Settings, CreditCard, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

const Dashboard = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate("/login");
        return;
      }
      
      setUser(data.session.user);
      
      // Fetch payment history if we added that table
      try {
        const { data: payments, error } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', data.session.user.id)
          .order('created_at', { ascending: false });
          
        if (!error && payments) {
          setPaymentHistory(payments);
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          {language === 'zh' ? "加载中..." : "Loading..."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-eco-darkBlue mb-4">
            {language === 'zh' ? "欢迎回来" : "Welcome Back"}{user?.email ? `, ${user.email.split('@')[0]}` : ''}
          </h1>
          <p className="text-muted-foreground">
            {language === 'zh' 
              ? "查看您的碳足迹分析报告和付款历史记录" 
              : "View your carbon footprint analysis reports and payment history"}
          </p>
        </div>
        
        <Tabs defaultValue="reports" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
            <TabsTrigger value="reports">
              {language === 'zh' ? "我的报告" : "My Reports"}
            </TabsTrigger>
            <TabsTrigger value="payments">
              {language === 'zh' ? "付款历史" : "Payment History"}
            </TabsTrigger>
            <TabsTrigger value="settings">
              {language === 'zh' ? "账户设置" : "Settings"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports">
            {paymentHistory.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentHistory.map((payment) => (
                  <Card key={payment.id}>
                    <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">
                        {language === 'zh' ? "碳足迹分析报告" : "Carbon Footprint Report"}
                      </CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-4">
                        {new Date(payment.created_at).toLocaleDateString(
                          language === 'zh' ? 'zh-CN' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full text-eco-green border-eco-green hover:bg-eco-lightGreen"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        {language === 'zh' ? "查看报告" : "View Report"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <BarChart className="h-12 w-12 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    {language === 'zh' ? "还没有报告" : "No Reports Yet"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'zh' 
                      ? "您还没有购买任何碳足迹分析报告" 
                      : "You haven't purchased any carbon footprint analysis reports yet"}
                  </p>
                  <Button 
                    className="bg-eco-green hover:bg-eco-green/90 text-white"
                    onClick={() => navigate("/products")}
                  >
                    {language === 'zh' ? "浏览服务" : "Browse Services"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'zh' ? "付款历史" : "Payment History"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {paymentHistory.length > 0 ? (
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div 
                        key={payment.id} 
                        className="flex justify-between items-center p-3 border rounded"
                      >
                        <div>
                          <div className="font-medium">
                            {language === 'zh' ? "碳足迹分析服务" : "Carbon Footprint Analysis Service"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(payment.created_at).toLocaleDateString(
                              language === 'zh' ? 'zh-CN' : 'en-US',
                              { year: 'numeric', month: 'long', day: 'numeric' }
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ¥{payment.amount / 100}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {payment.status === 'completed' 
                              ? (language === 'zh' ? "已完成" : "Completed") 
                              : (language === 'zh' ? "处理中" : "Processing")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">
                      {language === 'zh' ? "无付款记录" : "No Payment Records"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'zh' 
                        ? "您还没有任何付款记录" 
                        : "You don't have any payment records yet"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'zh' ? "账户设置" : "Account Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {language === 'zh' ? "电子邮箱" : "Email"}
                  </h3>
                  <p className="text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {language === 'zh' ? "账户创建日期" : "Account Created"}
                  </h3>
                  <p className="text-muted-foreground">
                    {user?.created_at 
                      ? new Date(user.created_at).toLocaleDateString(
                          language === 'zh' ? 'zh-CN' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )
                      : '-'}
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="text-destructive border-destructive hover:bg-destructive/10"
                    onClick={async () => {
                      try {
                        await supabase.auth.signOut();
                        toast({
                          title: language === 'zh' ? "退出成功" : "Logged out successfully",
                        });
                        navigate("/");
                      } catch (error) {
                        console.error("Error signing out:", error);
                      }
                    }}
                  >
                    {language === 'zh' ? "退出登录" : "Sign Out"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
