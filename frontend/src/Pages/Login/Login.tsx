import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ navigateTo }: { navigateTo: (path: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

 
  return (
    <div className="relative min-h-screen w-full bg-slate-100 flex items-center justify-center pt-12 overflow-hidden p-4">

      <form className="w-full max-w-[450px]">
        <Card className="p-6 sm:p-10 rounded-3xl shadow-sm">
          <CardHeader className="text-center">
            <h1 className="text-2xl sm:text-[32px] font-semibold tracking-tight text-orange-500">
              Sign in
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground">
              Enter your details to login
            </p>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <div className="space-y-2 sm:space-y-3 relative">
            <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                className="h-10 sm:h-12 px-4 bg-white placeholder:text-sm lg:placeholder:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2 sm:space-y-3 relative">
            <Label htmlFor="password">Password</Label>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Password"
                className="h-10 sm:h-12 px-4 bg-white placeholder:text-sm lg:placeholder:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-8 w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center"
              >
                {isPasswordVisible ? (
                  <Eye className="text-gray-700" />
                ) : (
                  <EyeOff className="text-gray-700" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="rounded-[4px] border-gray-300"
                />
                <Label
                  htmlFor="remember"
                  className="text-xs sm:text-sm text-muted-foreground font-normal"
                >
                  Remember me
                </Label>
              </div>

             
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Login
              </Button>
            </div>

            <div className="text-sm">
            <span>Don't have an account? </span>
            <span
            className="text-blue-600 hover:underline font-medium cursor-pointer"
            onClick={() => navigateTo("/signup")}
            >
            Sign up
            </span>
            </div>

          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Login;
