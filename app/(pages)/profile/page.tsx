"use client"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, LogOut, Award, User as UserIcon, Loader2, Edit } from "lucide-react"
import { useAuth } from "@/components/context/AuthContext"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

// Generate a list of available avatars
const AVATARS = [
  ...Array.from({ length: 10 }, (_, i) => `/avatar_images/bluey_${i + 1}.png`),
  ...Array.from({ length: 27 }, (_, i) => `/avatar_images/vibrent_${i + 1}.png`),
  ...Array.from({ length: 35 }, (_, i) => `/avatar_images/memo_${i + 1}.png`),
  ...Array.from({ length: 15 }, (_, i) => `/avatar_images/notion_${i + 1}.png`),
  ...Array.from({ length: 22 }, (_, i) => `/avatar_images/upstream_${i + 1}.png`),
];

export default function ProfilePage() {
  const { user, logout, updateUserProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
        setDisplayName(user.displayName || user.email?.split('@')[0] || "Student");
        setSelectedAvatar(user.photoURL || user.avatarUrl || AVATARS[0]);
    }
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
        await updateUserProfile({ displayName, avatarUrl: selectedAvatar });
        toast.success("Profile updated successfully");
        setIsOpen(false);
    } catch (error) {
        console.error(error);
        toast.error("Failed to update profile");
    } finally {
        setLoading(false);
    }
  };

  if (!user) {
      return (
          <div className="container mx-auto p-8 flex items-center justify-center min-h-[50vh]">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
      );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
            <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-xl">
            <AvatarImage src={user.photoURL || user.avatarUrl || ""} className="object-cover" />
            <AvatarFallback className="bg-slate-900 text-white text-4xl">
                {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
            </AvatarFallback>
            </Avatar>
        </div>

        <h2 className="text-3xl font-bold text-slate-900">{user.displayName || "Student"}</h2>
        <p className="text-slate-500 font-medium">{user.email}</p>

        <div className="flex gap-2 mt-4">
             <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-full pl-3 pr-4 gap-2">
                    <Edit className="w-4 h-4" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal details and avatar.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                        id="name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2">
                      <Label>Choose Avatar</Label>
                      <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-slate-50">
                          <div className="grid grid-cols-4 gap-4">
                              {AVATARS.map((avatar, i) => (
                                  <div
                                      key={i}
                                      className={`cursor-pointer rounded-full p-1 border-2 transition-all ${selectedAvatar === avatar ? "border-blue-600 ring-2 ring-blue-100 bg-white" : "border-transparent hover:bg-slate-200"}`}
                                      onClick={() => setSelectedAvatar(avatar)}
                                  >
                                      <img src={avatar} alt={`Avatar ${i}`} className="w-full h-full rounded-full object-cover" />
                                  </div>
                              ))}
                          </div>
                      </ScrollArea>
                  </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Level</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold flex items-baseline gap-2">
                        XP {user.xp || 0}
                        <span className="text-sm font-normal text-slate-400">points</span>
                    </div>
                </CardContent>
             </Card>
             <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Joined</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Recently"}
                    </div>
                </CardContent>
             </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Account Settings</CardTitle>
            <Settings className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => logout()}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
