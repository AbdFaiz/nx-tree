"use client";

import { useState, useCallback, ChangeEvent, useEffect } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  FileText,
  Check,
  Camera,
  Palette,
  Loader2,
  AtSign,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  theme_color: string | null;
  avatar_url: string | null;
}

export function ProfileEditor({ profile }: { profile: Profile }) {
  // Form State
  const [fullName, setFullName] = useState(profile.full_name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [themeColor, setThemeColor] = useState(
    profile.theme_color || "#ffffff"
  );
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");

  // Username Logic State
  const [username, setUsername] = useState(profile.username || "");
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null); // null = idle, true = available, false = taken
  const [checkingUsername, setCheckingUsername] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [uploading, setUploading] = useState(false);

  const supabase = createClient();

  // Username Availability Checker (Debounced)
  useEffect(() => {
    if (!username || username === profile.username) {
      setIsUsernameValid(null);
      return;
    }

    const checkUsername = async () => {
      setCheckingUsername(true);
      const { error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username.toLowerCase())
        .single();

      // Jika data tidak ditemukan (error), berarti username tersedia
      setIsUsernameValid(!!error);
      setCheckingUsername(false);
    };

    const timeoutId = setTimeout(checkUsername, 500);
    return () => clearTimeout(timeoutId);
  }, [username, profile.username, supabase]);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const createCroppedImage = async (): Promise<Blob | null> => {
    try {
      if (!image || !croppedAreaPixels) return null;
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.src = image;
      await new Promise((resolve) => (img.onload = resolve));
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      return new Promise((resolve) =>
        canvas.toBlob((blob) => resolve(blob), "image/jpeg")
      );
    } catch (e) {
      return e as null;
    }
  };

  const handleUpload = async () => {
    const croppedBlob = await createCroppedImage();
    if (!croppedBlob) return;
    setUploading(true);
    const fileName = `${profile.id}-${Date.now()}.jpg`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, croppedBlob);
    if (!error) {
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);
      setAvatarUrl(urlData.publicUrl);
      setImage(null);
    }
    setUploading(false);
  };

  const updateProfile = async () => {
    if (isUsernameValid === false) return; // Jangan save jika username tidak valid
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        username: username.toLowerCase(),
        full_name: fullName,
        bio,
        theme_color: themeColor,
        avatar_url: avatarUrl,
      })
      .eq("id", profile.id);

    setLoading(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* CROPPER OVERLAY TETAP SAMA NAMUN DENGAN UI MINIMALIS */}
      {image && (
        <div className="fixed inset-0 z-[100] bg-zinc-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-md aspect-square bg-zinc-900 rounded-[2.5rem] overflow-hidden">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="mt-8 flex gap-3 w-full max-w-md">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-2xl border-white/10 text-white bg-white/5 hover:bg-white/10"
              onClick={() => setImage(null)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12 rounded-2xl bg-white text-zinc-900 hover:bg-zinc-200 font-bold"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? <Loader2 className="animate-spin" /> : "Set Photo"}
            </Button>
          </div>
        </div>
      )}

      <Card className="border border-zinc-200 rounded-[2.5rem] bg-white shadow-sm overflow-hidden">
        <div className="p-8 lg:p-12 space-y-12">
          {/* AVATAR SECTION */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-zinc-900/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Avatar className="h-32 w-32 border border-zinc-100 shadow-2xl relative">
                <AvatarImage src={avatarUrl} className="object-cover" />
                <AvatarFallback className="bg-zinc-50 font-bold text-xl italic uppercase text-zinc-300">
                  {profile.username?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <label className="absolute inset-0 flex items-center justify-center bg-zinc-900/60 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 scale-95 group-hover:scale-100">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={onFileChange}
                />
                <Camera className="w-6 h-6" />
              </label>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
              Profile Image
            </span>
          </div>

          <div className="grid gap-10">
            {/* USERNAME FIELD WITH CHECKER */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                <AtSign className="w-3 h-3" /> Custom Username
              </label>
              <div className="relative group">
                <Input
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.replace(/\s+/g, "").toLowerCase()
                    )
                  }
                  className={cn(
                    "h-14 px-5 text-lg font-bold rounded-2xl border-zinc-200 transition-all",
                    isUsernameValid === true &&
                      "border-emerald-500 bg-emerald-50/10 focus:ring-emerald-500",
                    isUsernameValid === false &&
                      "border-red-500 bg-red-50/10 focus:ring-red-500"
                  )}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {checkingUsername ? (
                    <Loader2 className="w-5 h-5 animate-spin text-zinc-300" />
                  ) : isUsernameValid === true ? (
                    <Check className="w-5 h-5 text-emerald-500" />
                  ) : isUsernameValid === false ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : null}
                </div>
              </div>
              {isUsernameValid === false && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight pl-1">
                  Username is already taken.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Display Name */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                  <User className="w-3 h-3" /> Display Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-14 px-5 text-lg font-bold rounded-2xl border-zinc-200 bg-zinc-50/30"
                />
              </div>

              {/* Brand Color */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                  <Palette className="w-3 h-3" /> Brand Color
                </label>

                {/* Field shell — sama tinggi dengan Input */}
                <div className="h-14 px-4 flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/30">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-zinc-200"
                  />
                  <span className="font-mono text-sm font-bold text-zinc-500">
                    {themeColor.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">
                <FileText className="w-3 h-3" /> About Me
              </label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="h-32 p-5 rounded-2xl border-zinc-200 bg-zinc-50/30 resize-none font-medium leading-relaxed"
              />
            </div>
          </div>

          <Button
            onClick={updateProfile}
            disabled={loading || isUsernameValid === false}
            className="w-full h-16 rounded-full bg-zinc-900 text-white font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-zinc-200 hover:bg-zinc-800 transition-all disabled:bg-zinc-100 disabled:text-zinc-400"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-3 w-4 h-4" />
            ) : saved ? (
              <Check className="mr-3 w-4 h-4" />
            ) : null}
            {loading ? "Publishing..." : saved ? "Success" : "Update Identity"}
          </Button>
        </div>
      </Card>

      {/* FOOTER DECOR */}

      <div className="flex justify-center items-center gap-6 pt-4">
        <div className="h-[1px] w-12 bg-zinc-200" />

        <p className="text-[9px] font-bold text-zinc-300 uppercase tracking-[0.5em]">
          End of identity module
        </p>

        <div className="h-[1px] w-12 bg-zinc-200" />
      </div>
    </div>
  );
}
