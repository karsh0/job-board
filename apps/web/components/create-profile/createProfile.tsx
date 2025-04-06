"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addResume, addSkills, updateAvatar } from "../../actions/user.action";

export default function CreateProfile() {
  const { register, handleSubmit, watch } = useForm();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const avatarFileList = watch("avatar");
  const resumeFileList = watch("resume");

  useEffect(() => {
    const file = avatarFileList?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [avatarFileList]);

  useEffect(() => {
    const file = resumeFileList?.[0];
    if (file) {
      setResumeName(file.name);
    }
  }, [resumeFileList]);

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills((prev) => [...prev, skillInput.trim()]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  async function CreateProfileHandler(data: any) {
    const avatarFile = data.avatar[0];
    const resumeFile = data.resume[0];
    if (!avatarPreview || !resumeName) {
      return;
    }
    await updateAvatar(avatarPreview);
    await addResume(resumeName);
    await addSkills({ skills });
  }

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-8 shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-black mb-8">Create Your Profile</h2>

      <form onSubmit={handleSubmit(CreateProfileHandler)} className="space-y-8">
        <div className="flex flex-col items-center">
          <label className="cursor-pointer relative group">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 shadow-md transition duration-300 group-hover:opacity-80"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-4 border-dashed border-blue-300 shadow-inner transition duration-300 group-hover:opacity-80">
                Upload
              </div>
            )}
            <input
              type="file"
              {...register("avatar", { required: true })}
              accept="image/*"
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-500 mt-2">Click the avatar to upload image</p>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Upload Resume</label>
          <input
            type="file"
            {...register("resume", { required: true })}
            accept=".pdf,.doc,.docx"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {resumeName && (
            <p className="text-sm text-green-600 mt-1 font-medium">Selected: {resumeName}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Add Skills</label>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Type a skill and press Enter"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-wrap mt-3 gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium flex items-center shadow-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-blue-500 hover:text-red-600 transition"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition shadow-lg"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
}
