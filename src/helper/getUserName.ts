function getInitials(fullName: string) {
  const nameParts = fullName.trim().split(" ");
  if (nameParts.length >= 2) {
    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    const lastNameInitial = nameParts[nameParts.length - 1]
      .charAt(0)
      .toUpperCase();
    return firstNameInitial + lastNameInitial;
  }
  return "";
}

export default getInitials;
