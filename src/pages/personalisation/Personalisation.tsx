import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../store/userStore";
import { useUserThemeStore } from "../../store/userThemeStore";
import { BackgroundModeType, IconColorType } from "../../types/userTheme";
import CustomColorIcon from "../../ui/icons/CustomColorIcon";
import { updateOrCreateUserTheme } from "../../services/userThemeApi";
import CustomButton from "../../ui/button/CustomButton";
import FormLabel from "../../ui/label/FormLabel";

const Personalisation = () => {
    const currentUser = useUserStore((state) => state.currentUser);
    const iconColor = useUserThemeStore((state) => state.iconColor);
    const setIconColor = useUserThemeStore((state) => state.setIconColor);
    const backgroundMode = useUserThemeStore((state) => state.backgroundMode);
    const setBackgroundMode = useUserThemeStore((state) => state.setBackgroundMode);
    const highlightMode = useUserThemeStore((state) => state.highlightMode);
    const setHighlightMode = useUserThemeStore((state) => state.setHighlightMode);

    const colorSet: IconColorType[] = ["purple", "green", "orange", "blue"];
    const backgrounColorSet: BackgroundModeType[] = ["white", "black"];

    const queryClient = useQueryClient();
    const editUserThemeMutation = useMutation({
        mutationFn: updateOrCreateUserTheme,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userTheme"] });
        }
    });

    const handleUpdateTheme = async () => {
        if ( !currentUser ) return;
        const data = {
            id: currentUser.id,
            userId: currentUser.id,
            backgroundMode,
            highlightMode,
            iconColor,
        };
        if ( data )
            editUserThemeMutation.mutate(data);
    }

    
    if ( !currentUser ) return <h1>No user`s data!</h1>

    return (
        <div className={`w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-5 pb-24 ${backgroundMode === "black" ? "text-white" : "text-gray-800"}`} >
            <FormLabel text={"Your icon color"}>
                <div className="flex justify-center items-center gap-3 pt-2">
                    {colorSet.map((color) => (
                        <CustomColorIcon
                            key={color}
                            backgroundColor={color}
                            onClick={setIconColor}
                            currentColor={iconColor}
                        />
                    ))}
                </div>
            </FormLabel>
            <FormLabel text={"Highlight color"}>
                <div className="flex justify-center items-center gap-3 pt-2">
                    {colorSet.map((color) => (
                        <CustomColorIcon
                            key={color}
                            backgroundColor={color}
                            onClick={setHighlightMode}
                            currentColor={highlightMode}
                        />
                    ))}
                </div>
            </FormLabel>
            <FormLabel text={"Theme color"}>
                <div className="flex justify-center items-center gap-3 pt-2">
                    {backgrounColorSet.map((color) => (
                        <CustomColorIcon
                            key={color}
                            backgroundColor={color}
                            onClick={setBackgroundMode}
                            currentColor={backgroundMode}
                        />
                    ))}
                </div>
            </FormLabel>
            <CustomButton text={"Save changes"} onClick={handleUpdateTheme} customStyles={{ width: 200 }} />
        </div>
      );
      
}

export default Personalisation;