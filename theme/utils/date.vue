<script lang="ts">
export const getDateInEnglish = (dateString: string): string => {
  const date = new Date(dateString);
  if (Object.prototype.toString.call(date) === '[object Date]') {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(date.getTime())) {
      return 'Date not valid';
    }
    const options = { month: 'short' };
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  }
  return 'No date';
};

export default {
  getDateInEnglish,
};
</script>
