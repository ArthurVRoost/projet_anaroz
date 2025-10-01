<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RoleController extends Controller
{
    public function index()
    {
        $bannerImage = asset('storage/banner/offer_img.png');

        return Inertia::render('Users', [
            'bannerImage' => $bannerImage,
            'users' => User::with('role:id,nom')->get(['id','nom','prenom','pseudo','email','role_id']),
            'roles' => Role::all(['id','nom']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => ['required','string','max:255'],
            'prenom' => ['required','string','max:255'],
            'pseudo' => ['required','string','max:255','unique:users,pseudo'],
            'email' => ['required','string','email','max:255','unique:users,email'],
            'password' => ['required','confirmed', Password::defaults()],
            'role_id' => ['nullable','exists:roles,id'],
        ]);

        User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'pseudo' => $request->pseudo,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id ?? 2, // par défaut "User"
        ]);

        return back();
    }

    public function update(Request $request, $id)
    {
       
        $user = User::findOrFail($id);

        $request->validate([
            'nom' => ['required','string','max:255'],
            'prenom' => ['required','string','max:255'],
            'pseudo' => ['required','string','max:255','unique:users,pseudo,'.$user->id],
            'email' => ['required','string','email','max:255','unique:users,email,'.$user->id],
            'password' => ['nullable','confirmed', Password::defaults()],
            'role_id' => ['required','exists:roles,id'],
        ]);

        $data = $request->only('nom','prenom','pseudo','email','role_id');

        if ($request->filled('password')) {
            $data['password'] = $request->password; // laisse Laravel hasher via cast
        }

        $user->update($data);

        return redirect()->route('users.index')->with('success', 'Utilisateur mis à jour.');
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return back();
    }
}