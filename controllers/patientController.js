import connection from '../bd.js'

const createUser = async (req, res) => {
    try {
        const { name, CC, tel, isActive, email } = req.body

        const [result] = await connection.execute(
            'INSERT INTO users (name, CC, tel, isActive, email) VALUES (?, ?, ?, ?, ?)',
            [name, CC, tel, isActive, email]
        )

        res.status(201).json({
            message: 'User created',
            id: result.insertId
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM users'
        )

        res.json(rows)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET BY ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params

        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [id]
        )

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.json(rows[0])

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// UPDATE
const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, CC, tel, isActive, email } = req.body

        const [result] = await connection.execute(
            'UPDATE users SET name = ?, CC = ?, tel = ?, isActive = ?, email = ? WHERE user_id = ?',
            [name, CC, tel, isActive, email, id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.json({ message: 'User updated' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// DELETE
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const [result] = await connection.execute(
            'DELETE FROM users WHERE user_id = ?',
            [id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.json({ message: 'User deleted' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}