<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class FileService{
    public static function make($file, $folder = '', $disk = 'local') {
        if(!$file)  
            return;

        $path = Storage::disk($disk)->path($folder);
        
        !is_dir($path) && mkdir($path, 0777, true);
        
        $file_name   = time() . $file->getClientOriginalName();
        $file_path   = trim(str_replace(['\\','/'],DIRECTORY_SEPARATOR,$folder), DIRECTORY_SEPARATOR). DIRECTORY_SEPARATOR . $file_name;

        Storage::disk($disk)->put($file_path, File::get($file));

        return $file_path;
    } 

    public static function delete($file, $disk = 'local') {
        if($file)
            Storage::disk($disk)->delete($file);
    }

    public static function replace($file, $folder = '', $disk = 'local', $old_file = null) {
        if(!$file)
            return $old_file;

        self::delete($old_file, $disk);
        
        return self::make($file, $folder, $disk);
    }
}