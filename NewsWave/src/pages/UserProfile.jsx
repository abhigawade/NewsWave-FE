import { Button } from "@/components/ui/button";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCircle } from "lucide-react";

const UserProfile = ({ userData }) => {
  return (
    <Card className="w-[500px] h-[300px] bg-white overflow-hidden">
      <h2 className="text-lg font-bold mb-3 text-center mt-3">
          Your Profile
        </h2>
      <CardContent className="p-2 px-6">
        
          {/* Profile Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">First Name</label>
              <Input 
                value={userData.first_name} 
                disabled 
                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Last Name</label>
              <Input 
                value={userData.last_name} 
                disabled 
                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-900">Email</label>
              <Input 
                value={userData.email} 
                disabled 
                className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-center space-x-4">
            <Button 
              variant="outline" 
              className="bg-black text-white hover:bg-primary/90 transition-colors px-8"
            >
              Edit Profile
            </Button>
          </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
