import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";


const Signup = ({ navigateTo }: { navigateTo: (path: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

 
  return (
    <div className="relative min-h-screen w-full bg-slate-100 flex items-center justify-center pt-12 overflow-hidden p-4">

      <form className="w-full max-w-[450px]">
        <Card className="p-6 sm:p-10 rounded-3xl shadow-sm">
          <CardHeader className="text-center p-0">
            <h1 className="text-2xl sm:text-[32px] font-semibold tracking-tight text-orange-500">
              Create Account
            </h1>
            <p className="text-sm lg:text-base text-muted-foreground">
            Create your account to get started
            </p>
          </CardHeader>
          <CardContent className="space-y-3 p-0">
            <div className="space-y-1 sm:space-y-2 relative">
            <Label htmlFor="username">Username</Label>
              <Input
                type="username"
                name="username"
                placeholder="Enter username"
                className="h-10 sm:h-12 px-4 bg-white placeholder:text-sm lg:placeholder:text-base"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-1 sm:space-y-2 relative">
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

            <div className="space-y-1 sm:space-y-2 relative">
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


            <div className="space-y-1 sm:space-y-2 relative">
            <Label htmlFor="confirmPassword">Confirm passowrd</Label>
              <Input
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                className="h-10 sm:h-12 px-4 bg-white placeholder:text-sm lg:placeholder:text-base"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="password"
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className="absolute right-3 top-8 w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center"
              >
                {isConfirmPasswordVisible ? (
                  <Eye className="text-gray-700" />
                ) : (
                  <EyeOff className="text-gray-700" />
                )}
              </button>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Sign up
              </Button>
            </div>

            
            <div className="text-sm">
            <span>Already have an account? </span>
            <span
            className="text-blue-600 hover:underline font-medium cursor-pointer"
            onClick={() => navigateTo("/login")}
            >
            Login
            </span>
            </div>

          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Signup;
