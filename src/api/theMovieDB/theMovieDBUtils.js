const getMediaName = (media) => media.original_title || media.original_name;

export const apiMedia2Media = (media) => ({
  name: getMediaName(media),
  id: media.id,
});
