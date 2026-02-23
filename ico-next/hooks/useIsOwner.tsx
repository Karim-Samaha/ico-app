import { getCurrentAccount } from '@/web3/useCases'
import { getOwner } from '@/web3/useCases'
import { useState, useEffect } from 'react'

export const useIsOwner = () => {
    const [isOwner, setIsOwner] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const checkOwner = async () => {
        try {
            setLoading(true)
            setError(null)

            // Get current user account
            const currentAccount = await getCurrentAccount()
            if (!currentAccount) {
                setIsOwner(false)
                setLoading(false)
                return
            }

            // Get contract owner
            const ownerAddress = await getOwner()

            // Compare addresses (case-insensitive)
            const isOwnerResult = currentAccount.toLowerCase() === ownerAddress.toLowerCase()
            setIsOwner(isOwnerResult)
        } catch (err: any) {
            console.error('Error checking owner:', err)
            const errorMessage = err.message || 'Failed to check owner'
            setError(errorMessage)
            setIsOwner(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkOwner()

        // Listen for account changes
        if (typeof window == 'undefined') return
        if ("ethereum" in window && window?.ethereum) {
            const handleAccountsChanged = () => {
                checkOwner()
            }

            (window?.ethereum as unknown as { on: (event: string, callback: () => void) => void })
                .on('accountsChanged', handleAccountsChanged)

            return () => {
                if ("ethereum" in window && window?.ethereum) {
                    (window?.ethereum as unknown as { removeListener: (event: string, callback: () => void) => void })
                    .removeListener('accountsChanged', handleAccountsChanged)
                }
            }
        }
    }, [])

    return {
        isOwner,
        loading,
        error,
        refetch: checkOwner
    }
}

