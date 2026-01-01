import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, LogOut, Award, Clock } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4 border-4 border-slate-100">
          <AvatarImage src="" />
          <AvatarFallback className="bg-slate-900 text-white text-2xl">JS</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">John Student</h2>
        <p className="text-slate-500">Preparing for SSC CGL 2024</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Account Settings</CardTitle>
            <Settings className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">Update Profile</Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Achievements</CardTitle></CardHeader>
          <CardContent className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center p-4 border rounded-xl bg-slate-50">
                <Award className="w-8 h-8 text-yellow-600 mb-2" />
                <span className="text-xs font-bold uppercase">7 Day Streak</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
