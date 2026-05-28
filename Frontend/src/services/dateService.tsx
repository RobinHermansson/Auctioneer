const formatAuctionEndDate = (dateString: string): string => {
    const date = new Date(dateString);

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const dateFormatted = `${day} ${month} ${hours}:${minutes}`;

    if (daysLeft < 0) {
        const daysAgo = Math.abs(daysLeft);
        return `${dateFormatted} (${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago)`;
    }

    if (daysLeft === 0) return `${dateFormatted} (today)`;
    if (daysLeft === 1) return `${dateFormatted} (tomorrow)`;

    return `${dateFormatted} (${daysLeft} days)`;
};

export default formatAuctionEndDate;